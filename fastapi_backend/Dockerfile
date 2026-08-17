FROM python:3.12-slim

# System deps: build tools + libgl/libglib for opencv/pillow-based image models,
# and sqlite dev libs for Chroma
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# HF Spaces / Render run containers as a non-root user by default; create one
# and make sure it owns writable dirs (important for Chroma's sqlite file)
RUN useradd -m -u 1000 appuser
WORKDIR /app

# Install Python deps first (layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip

# torch is needed by sentence-transformers/transformers for embeddings.
# Installed separately from the CPU-only index so pip doesn't pull the
# ~2GB CUDA build. Remove this line if you ever move to a GPU instance.
RUN pip install --no-cache-dir torch==2.13.0 --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir -r requirements.txt

# Strip pip cache / compiled bytecode left behind to shrink the final layer
RUN find /usr/local/lib -name "*.pyc" -delete && \
    find /usr/local/lib -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true

# Copy app code (build context = fastapi_backend/ since Render Root Directory
# is set to that folder, so this brings in main.py, AGENTS/, SCHEME_AGENT/, etc.)
COPY . .

# If Chroma/sqlite persists data inside the container, give appuser write access
RUN mkdir -p /app/chroma_db && chown -R appuser:appuser /app

USER appuser

# Render / HF Spaces expect the app on port 7860 (Render also respects $PORT,
# but 7860 works fine as a fixed default for HF; for Render you can switch to
# "--port", "$PORT" if needed)
EXPOSE 7860

# Root Directory = fastapi_backend, so main.py sits directly at /app/main.py
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]

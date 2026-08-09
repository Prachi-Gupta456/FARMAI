import json
from pathlib import Path
import numpy as np
from tensorflow import keras
from keras.models import load_model
from keras.preprocessing import image

BASE_DIR = Path(__file__).resolve().parent

model = load_model(BASE_DIR / "FINAL_BEST_MODEL.keras")

with open(BASE_DIR / "class_mapping.json") as f:
    data = json.load(f)

class_indices = data["class_to_index"]
idx_to_class = {v: k for k, v in class_indices.items()}

IMG_SIZE = (256, 256)


def predict_disease(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array, verbose=0)[0]
    top_index = int(np.argmax(preds))

    label = idx_to_class[top_index]
    confidence = float(preds[top_index])
    return label, confidence
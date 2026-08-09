def market_parser(data):
    records = data.get("records", [])

    if not records:
        return "No recent price data available for this crop in this district."

    def safe_float(value):
        try:
            return float(value)
        except (TypeError, ValueError):
            return None

    clean_records = []
    for record in records:
        clean_records.append({
            "commodity": record.get("commodity"),
            "market": record.get("market"),
            "district": record.get("district"),
            "state": record.get("state"),
            "variety": record.get("variety"),
            "grade": record.get("grade"),
            "arrival_date": record.get("arrival_date"),
            "min_price": safe_float(record.get("min_price")),
            "max_price": safe_float(record.get("max_price")),
            "modal_price": safe_float(record.get("modal_price")),
        })

    return clean_records
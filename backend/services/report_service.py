def calculate_status(result, min_val, max_val):
    if result < min_val or result > max_val:
        return "Abnormal"
    return "Normal"
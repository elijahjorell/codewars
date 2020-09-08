number = -12
a = 2
b = -6

def is_divide_by(number, a, b):
    return True if number % a == 0 and number % b == 0 else False

print(is_divide_by(number, a, b))
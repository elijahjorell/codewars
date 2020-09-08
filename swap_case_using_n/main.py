# https://www.codewars.com/kata/5f3afc40b24f090028233490

s = 'Hello world!'
n = 11

def swap(s, n):
    n_binary = list(map(int, str(bin(n)[2:])))
    s_list = list(s)

    for i, char in enumerate(s_list):
        s_list[i] = char.swapcase() if n_binary[0] else char
        if char.isalpha(): n_binary.append(n_binary.pop(0))
    
    return ''.join(s_list)

print(swap(s, n))
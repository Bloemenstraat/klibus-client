import os

for d in ['cats', 'dogs']:
    files = os.listdir(d)
    for i, f in enumerate(files):
        os.rename(f'./{d}/{f}', f'./{d}/{d}_{i}.jpg')

print('Great success!')
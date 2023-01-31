
if __name__ == '__main__':
    WIDTH = 142
    HEIGHT = 70
    json = '[\n'
    for i in range(HEIGHT):
        json += '['
        for y in range(WIDTH):
            if y < WIDTH - 1:
                json += '0,'
            else:
                json += '0'

        if i < HEIGHT - 1:
            json += '],\n'
        else:
            json += ']\n'
    json += ']'

    print(json)
    FILE = open('install_screen.json', 'w')
    FILE.write(json)

    FILE.close()

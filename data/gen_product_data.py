import random

product_types = ['shirt', 'hoodie', 'pants', 'tank top', 't-shirt', 'jeans']
product_colors = ['black', 'green', 'blue', 'red', 'yellow', 'purple', 'white']
product_sizes = ['xs', 's', 'l', 'xl', 'xxl']
product_object = {"type": "", "color": "", "price": 0, "size": ""}

f = open("product_data.json", "w")

for i in range (1, 1001):

    product_object["type"] = product_types[random.randint(0, len(product_types) - 1)]
    product_object["color"] = product_colors[random.randint(0, len(product_colors) - 1)]
    product_object["size"] = product_sizes[random.randint(0, len(product_sizes) - 1)]
    product_object["price"] = random.randint(5, 50)

    f.write('{"index": {}}\n' + str(product_object).replace("'", '"') + '\n')

f.close()






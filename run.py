import subprocess
import os
import requests
import time

def run():

    os.chdir("data")
    print('Creating data...')
    subprocess.run(["python3", "gen_product_data.py"])

    products_index = open( 'data/products_index.json').read()
    products_data = open('data/product_data.json').read()
    FNULL = open(os.devnull, 'w')
    headers = {
        "Content-Type": "application/json"
    }

    os.chdir("../")
    print('Creating containers for elastic...')
    subprocess.run(["docker-compose", "up", "-d"], stdout=FNULL)
    print('Waiting for elastic to go online...')
    time.sleep(10)

    print("Creating products index and uploading data to elastic")

    res = requests.request("PUT", "http://localhost:9200/products/", data=products_index, headers=headers)
    if (res.status_code != 200):
        print('There was an error creating the index: ' + res.text)
    else:
        print('Index created')
    res = requests.request("POST", "http://localhost:9200/products/_bulk", data=products_data, headers=headers)
    if (res.status_code != 200):
        print('There was an error adding data: ' + res.text)
    else:
        print('Data added')
   
    print("Running web server at port 8000")
    os.chdir("web")
    subprocess.run(["python3", "-m", "http.server"])

    house_index_file.close()
    FNULL.close()

if __name__ == "__main__":
    run()
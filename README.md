# Elasticsearch POC with docker
This project is a poc for creating a product search website.

## What it does
The project includes a `run.py`. Running it does the following:
1. Creating mock data
2. Spawning a small ES using docker compose
3. Creates a product index in ES
4. Indexes mock product data
5. Spawns a local web server using python3 http.server module

## How to use it
After you run `run.py`, go to localhost:8000 and search for products using the search form

## Requirements
This ES poc script makes use of the requests python package. Install it before you run the script.

Code was written in python3

## How to run
Simply run the main file `run.py`


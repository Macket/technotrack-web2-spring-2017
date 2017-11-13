from celery import task
from time import sleep

@task
def debug_task(something):
    sleep(5)
    return something ** 100


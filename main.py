from flask import Flask, send_from_directory, jsonify
from flask import request, render_template
import os
from glob import glob
from watchdog.observers import Observer
from watchdog.events import FileCreatedEvent, FileModifiedEvent, FileSystemEventHandler
import random



app_dir = os.path.dirname(os.path.realpath(__file__))
media_dir = "./pi/"
media_url = '/media/'
media_api_url = '/pics/'
template_dir = os.path.join(app_dir , 'build/')
app = Flask(__name__, template_folder=template_dir, static_url_path='/static/')

# filechages handler

media_files = []
media_hash = None


    

def handleChanges(event):
    global media_files, media_hash
    exts = ['*.png', '*.jpg', '*.jpeg']
    media_files = []
    for ext in exts:
        media_files.extend(glob(media_dir + ext))
    media_files.sort(key = os.path.getmtime)
    media_files.reverse()
    media_files = list(map(lambda x: media_url + x.split('/')[-1], media_files))
    tmp = random.randint(100, 1000000)
    if tmp == media_hash:
        media_hash += tmp
    else:
        media_hash = tmp

with app.app_context():
    handleChanges(0)

handler = FileSystemEventHandler()
handler.on_created = handleChanges
handler.on_modified = handleChanges
observer = Observer()
observer.schedule(handler, media_dir)
observer.start()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('index.html')

@app.route('/static/<path:path>')
def files(path):
    # print('hello')
    return send_from_directory(template_dir, path)


@app.route(media_url + '<path:filename>')
def media(filename):
    return send_from_directory(media_dir, filename)

@app.route(media_api_url+'<path:hash>')
def medias(hash):
    if str(media_hash) == hash:
        return jsonify({})
    return jsonify({'hash': media_hash, 'files' : media_files})
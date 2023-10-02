from flask import Flask, render_template, request
from PIL import Image as PILImage  # Rename the Image module to avoid conflict
import os
import numpy as np
from keras.models import load_model
from flask import jsonify

app = Flask(__name__)

model = load_model('C:/Users/Iulia/Desktop/PythonApp/models/model.h35')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify', methods=['POST'])
def classify():
    image = request.files['image']

    image_path = 'C:/Users/Iulia/Desktop/PythonApp/tempimg/image.jpg'
    image.save(image_path)

    #preprocessing the image
    image = PILImage.open(image_path).convert('RGB')
    if image.size[0] >= 128 and image.size[1] >= 128:
        image = image.resize((128, 128))
        image = np.asarray(image)
        image = image.astype('float32') / 255
        image = np.expand_dims(image, axis=0)


        #classification
        result = model.predict(image)
        class_index = np.argmax(result)
        class_name = get_class_name(class_index)
    else:
        class_name = "Invalid Image Size"

    os.remove(image_path)

    return jsonify({"result": class_name})  #the result as JSON for the java code

def get_class_name(index):
    class_names = ['adansonii','anthurium','english-ivy','ficus-benjamina','ficus-tineke','fiddle-leaf-fig','golden-pothos','marble-pothos','monstera-del','peace-lily','peperomioides','pilea-moon-valley','tradescantia','zz']
    return class_names[index]

if __name__ == '__main__':
    app.run(debug=True)

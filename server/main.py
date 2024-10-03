from flask import Flask, jsonify, request
from flask_cors import CORS
from Parse import Parse
import os


app = Flask(__name__)
cors = CORS(app, origins = "*")


# @app.route("/courses", methods = ["GET"])
# def parseCourse():
    
#     pdf = Parse()
#     pdf.parsePDF()
    
    
#     return jsonify(
#         {
#             "courses" : pdf.courses
#         }
#     )
    
@app.route('/upload', methods = ["POST"] )
def receive_pdf():

    
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    
    if file.filename.endswith('.pdf'):
        filename = file.filename
        

        filepath = "E:\\Python Projects\\Advising Assist\\server\\"+ filename
        file.save(filepath)
        
        pdf = Parse()
        pdf.parsePDF(filepath)
        
        return jsonify(
        {
            "courses" : pdf.courses
        }) 
        
    return jsonify({"error": "Invalid file type"}), 400
    
    
    
    

    
if __name__ == "__main__":
    app.run(debug = True, port = 8080)
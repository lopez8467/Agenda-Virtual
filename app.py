from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/calcular", methods=["POST"])
def calcular():
    data = request.json
    operacion = data["expresion"]

    try:
        resultado = eval(operacion)
        return jsonify({"resultado": resultado})
    except:
        return jsonify({"resultado": "Error"})

app.run(debug=True)

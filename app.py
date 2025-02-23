from flask import Flask, render_template

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html', content="Homepage")


@app.route("/electricidad", methods=['GET'])
def electricidad():
    return "<h1>Tu mama en 2</h1>"


@app.route("/agua", methods=['GET'])
def agua():
    return render_template('agua.html')


@app.route("/basura", methods=['GET'])
def basura():
    return "<h1>Tu mama en 4</h1>"


@app.route("/plantas", methods=['GET'])
def plantas():
    return "<h1>Tu mama en 5</h1>"


@app.route("/vehiculos", methods=['GET'])
def vehiculos():
    return render_template("vehicles.html")


if __name__ == "__main__":
    app.run()
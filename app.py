from flask import Flask, render_template

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html', content="Homepage")


@app.route("/electricity", methods=['GET'])
def electricity():
    return "<h1>Tu mama en 2</h1>"


@app.route("/water", methods=['GET'])
def water():
    return render_template('water.html')


@app.route("/garbage", methods=['GET'])
def garbage():
    return render_template('trash.html')


@app.route("/plants", methods=['GET'])
def plants():
    return render_template("Plants.html")


@app.route("/vehicles", methods=['GET'])
def vehicles():
    return render_template("vehicles.html")


if __name__ == "__main__":
    app.run()
from flask import Flask, render_template
from flask_restful import Api, Resource, reqparse
from flask_httpauth import HTTPTokenAuth

app = Flask(__name__)
api = Api(app)
auth = HTTPTokenAuth('Token')


@app.route('/')
def index():
    return render_template("index.html")

    @auth.verify_token
    def verify_token(token):
        ret = token == 'hello'
        print(token, ret)
        return ret

    class LoginApi(Resource):

        def __init__(self):
            self.reqparse = reqparse.RequestParser()
            self.reqparse.add_argument('name', type=str, required=True,
                                       help='No task title provided', location='json')
            self.reqparse.add_argument('pwd', type=str, required=True,
                                       help='No task title provided', location='json')

        def post(self):
            return 'hello'

    class TasksApi(Resource):
        decorators = [auth.login_required]

        def get(self):
            return dict(name='ren', desc='hello')

    class LoginoutApi(Resource):
        decorators = [auth.login_required]

        def get(self):
            pass

    api.add_resource(LoginApi, '/login', endpoint='login')
    api.add_resource(TasksApi, '/tasks', endpoint='tasks')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

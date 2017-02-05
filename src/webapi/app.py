from flask import Flask
from flask_restful import Api, Resource
from flask_httpauth import HTTPTokenAuth

app = Flask(__name__)
api = Api(app)
auth = HTTPTokenAuth('Token')


@auth.verify_token
def verify_token(token):
    ret = token == 'hello'
    print(token, ret)
    return ret


class LoginApi(Resource):

    def get(self):
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

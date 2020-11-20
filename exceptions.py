'''
This file defines our custom exception
'''


def get_exception_message(e: Exception):
    return getattr(e, 'message', repr(e))

def get_exception_statuscode(e:Exception):
    return getattr(e, 'status_code', repr(e))

class BaseError(Exception):
    def __init__(self, message, status_code) -> None:
        super().__init__()
        self.message = message
        self.status_code = status_code


class ValidationError(BaseError):
    def __init__(self, message) -> None:
        super().__init__(message, 400)


class UnprocessableEntityError(BaseError):
    def __init__(self, message) -> None:
        super().__init__(message, 422)

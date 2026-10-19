import webview #used for displaying web app as desktop app
import socket
#import mysql.connector
#from mysql.connector import Error as MySQLError


class Api:  #enables simple communication between the python backend and javascript frontend
    def __init__(self):
        self.signed_in = False

    def sign_in(self, username, password):
        print("Sign-in attempt for:", username)  
        # INCOMPLETE: make actual password authentication 
        ok = False
        if(password == "password"): #test password
            ok = True

        self.signed_in = ok
        if ok:
            return {"ok": True}
        return {"ok": False, "reason": "wrong"}   # returns status on password
    
    def register(self, username, password, question1, answer1, question2, answer2):
        print("Registration attempt for:", username)  # never print the password or the answers
 
        # Normalise the answers so "Rex", "rex" and "Rex " all count as the same answer later.
        answer1 = answer1.strip().lower()
        answer2 = answer2.strip().lower()
 
        # INCOMPLETE: create the user with crypsis.core (user_creation, key derivation).

        return {"ok": True}   # the page then moves on to mfa-setup.html


    def test_db(self, settings):  #checks connection to db and valitdates the parameters
        #validate variables
        try:
            host = settings["host"].strip()
            port = int(settings["port"])
            database = settings["database"].strip()
            username = settings["username"].strip()
            password = settings["password"]

        except (KeyError, TypeError, ValueError, AttributeError):
            return {"ok": False, "reason": "invalid"}
        
        if not host or not database or not username or not password or not 1 <= port <= 65535:
            return {"ok": False, "reason": "invalid"}
        
        # test network connection

        try:
            socket.create_connection((host,port), timeout=3).close()

        except socket.gaierror:
            return {"ok": False, "reason": "bad-host"}      # the name does not resolve
        except OSError:
            return {"ok": False, "reason": "unreachable"} 
def get_mfa_setup(self):
        # LATER (pyotp + qrcode):

        return {"qr": None, "secret": "SAMPLE SECRET ONLY"}
 
def verify_mfa(self, code):
        print("MFA code received")   
        # use library later and find actual command to vlaidate the code
        if code == "123456":         # test value so the flow can be clicked through
            return {"ok": True}
        return {"ok": False, "reason": "wrong-code"}
 


 


webview.create_window(
    "Crypsis",
    "ui/login.html",         
    js_api=Api(),
    width=480, height=550,
    min_size=(380, 520),
)
webview.start(debug=False)    
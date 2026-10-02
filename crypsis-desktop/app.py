import webview #used for displaying web app as desktop app


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
    
    def register(self, username, password):
        print("Registration attempt for:", username)  
        # INCOMPLETE: create the user and make it update database
        pass
 


webview.create_window(
    "Crypsis",
    "ui/login.html",         
    js_api=Api(),
    width=480, height=550,
    min_size=(380, 520),
)
webview.start(debug=False)    
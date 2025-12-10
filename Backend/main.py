from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle
import uvicorn

# Load models and scalers
model = pickle.load(open('model.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))
mx = pickle.load(open('minmaxscaler.pkl', 'rb'))

# Initialize FastAPI app
app = FastAPI()

# Enable CORS so the frontend (Vite dev server) can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class PredictionRequest(BaseModel):
    Nitrogen: float
    Phosporus: float
    Potassium: float
    Temperature: float
    Humidity: float
    pH: float
    Rainfall: float

# Crop mapping
CROP_DICT = {
    1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
    8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
    14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
    19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
}

@app.get("/")
def index():
    return {"message": "Hello, this is the Crop Prediction API."}

@app.post("/predict")
def predict(data: PredictionRequest):
    feature_list = [data.Nitrogen, data.Phosporus, data.Potassium, data.Temperature, 
                    data.Humidity, data.pH, data.Rainfall]
    
    single_pred = np.array(feature_list).reshape(1, -1)
    
    mx_features = mx.transform(single_pred)
    sc_mx_features = sc.transform(mx_features)
    prediction = model.predict(sc_mx_features)
    
    if prediction[0] in CROP_DICT:
        crop = CROP_DICT[prediction[0]]
        result = f"{crop} is the best crop to be cultivated right there"
    else:
        result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
    
    return {"prediction": crop, "result": result}


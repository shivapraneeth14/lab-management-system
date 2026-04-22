from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_patient():
    response = client.post("/patients", json={
        "name": "Test User",
        "age": 25,
        "gender": "Male",
        "contact": "1234567890"
    })

    assert response.status_code == 200


def test_get_patients():
    response = client.get("/patients")
    assert response.status_code == 200

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import patient, report, dashboard

app = FastAPI()

# ✅ ADD THIS BLOCK HERE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create tables
Base.metadata.create_all(bind=engine)

# ✅ Include routers
app.include_router(patient.router)
app.include_router(report.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"message": "Backend Running"}
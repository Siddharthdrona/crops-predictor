import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv('crop_data.csv')
X = df.drop('label', axis=1)
y = df['label']

# Feature selection
selector = SelectKBest(score_func=chi2, k=5)
X_selected = selector.fit_transform(X, y)

# Split
X_train, X_test, y_train, y_test = train_test_split(X_selected, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model & selector
joblib.dump(model, 'crop_model.pkl')
joblib.dump(selector, 'feature_selector.pkl')

print("Model trained and saved.")

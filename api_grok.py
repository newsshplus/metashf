import urllib.request
import json

class GrokAnalyser:
    def __init__(self, token):
        self.base_url = "https://api.groq.com/v1/analyze"
        self.headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    
    def analisar_dados(self, dados, modelo="default"):
        request_data = json.dumps({
            "model": modelo,
            "data": dados,
            "analysis_type": "financial_report"
        }).encode('utf-8')
        
        req = urllib.request.Request(self.base_url, data=request_data, headers=self.headers)
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())

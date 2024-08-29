import os
import django
import pandas as pd

# Configure Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

# Importe os modelos do Django
from athletes.models import Athlete

# Consulte os dados usando o Django ORM
athletes = Athlete.objects.all().values()

# Converta os dados para um DataFrame do Pandas
df = pd.DataFrame(list(athletes))
df.to_excel("db_ff.xlsx")

# Exiba o DataFrame
print(df)

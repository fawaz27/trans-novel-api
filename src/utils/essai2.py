from google.cloud import translate

# Créez un client de traduction en spécifiant votre clé d'API
translate_client = translate.Client(api_key="YOUR_API_KEY")

# Définissez les paramètres de traduction
source_language = 'fr'
target_language = 'en'

# Traduisez le texte
translation = translate_client.translate(
    text='Bonjour, comment vas-tu?',
    source_language=source_language,
    target_language=target_language
)

# Affichez la traduction
print(translation['translatedText'])
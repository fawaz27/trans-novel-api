from google.cloud import translate

# Créez un client de traduction en spécifiant votre clé d'API
translate_client = translate.Client(api_key="YOUR_API_KEY")

# Définissez les paramètres de traduction
source_language = 'fr'
target_language = 'en'

# Ouvrez le fichier de texte à traduire
with open('text_to_translate.txt', 'r') as text_file:
    # Découpez le texte en segments de 1000 caractères
    segments = [ text_file[i:i+1000] for i in range(0, len( text_file), 1000)]
    
    # Traduisez chaque segment de texte
    translations = []
    for segment in segments:
        translation = translate_client.translate(
            text=segment,
            source_language=source_language,
            target_language=target_language
        )
        translations.append(translation['translatedText'])
    
    # Réassemblez les traductions en un seul texte traduit
    translated_text = ''.join(translations)
    
    # Affichez le texte traduit
    print(translated_text)
import os
import argparse
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

def main():
    # Configurar el parser de argumentos
    parser = argparse.ArgumentParser(description="Generar una imagen a partir de un prompt usando Gemini.")
    parser.add_argument("--prompt", type=str, required=True, help="El prompt para generar la imagen.")
    parser.add_argument("--filename", type=str, required=True, help="El nombre del archivo para guardar la imagen (ej: 'protagonista.png').")
    
    args = parser.parse_args()

    # Crear el cliente con la API key desde variable de entorno
    try:
        client = genai.Client(
            api_key=os.environ.get("GEMINI_API_KEY")
        )
    except Exception as e:
        print(f"Error al inicializar el cliente de GenAI. Asegúrate de que la variable de entorno GEMINI_API_KEY está configurada.")
        print(f"Error: {e}")
        return

    # Generar la imagen con la configuración adecuada
    print(f"Generando imagen con el prompt: '{args.prompt[:50]}...'")
    response = client.models.generate_content(
        model="gemini-2.0-flash-preview-image-generation",
        contents=args.prompt,
        config=types.GenerateContentConfig(
            response_modalities=['TEXT', 'IMAGE']
        )
    )

    # Procesar la respuesta
    if response.candidates and response.candidates[0].content and response.candidates[0].content.parts:
        image_part = None
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image_part = part
                break
        
        if image_part:
            # Convertir los datos de la imagen (bytes) a una imagen y guardar
            image = Image.open(BytesIO(image_part.inline_data.data))
            
            # Directorio de destino
            output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "manifestaciones_visuales")
            if not os.path.exists(output_dir):
                os.makedirs(output_dir)

            filepath = os.path.join(output_dir, args.filename)
            image.save(filepath)
            # image.show() # Comentado para no abrir la imagen automáticamente en el servidor
            print(f"[OK] Imagen guardada como '{filepath}'")
        else:
            print("Error: No se encontró contenido de imagen en la respuesta.")
            print("Respuesta completa:", response)
    else:
        print("Error: No se generaron candidatos válidos en la respuesta.")
        print("Respuesta completa:", response)

if __name__ == "__main__":
    main()

import requests

# Specify the URL of the webpage you want to save
url = 'https://stardewvalleywiki.com/Cooking'

# Path to the HTML file
file_path = 'helper/cooking.txt'

# Fetch the webpage content
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Get the HTML content
    html_content = response.text

    # Save the HTML content to a text file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(html_content)

    print("HTML content saved successfully to 'webpage.html'")
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

# String patterns to search for
start_string = '<table class="wikitable sortable roundedborder">'
end_string = '</footer>'

# Open the file and read its contents
with open(file_path, 'r', encoding='utf-8') as file:
    file_content = file.read()

# Find the position of the first occurrence of the start and end strings
start_position = file_content.find(start_string)
end_position = file_content.find(end_string)

# If both strings are found
if start_position != -1 and end_position != -1:
    # Include the entire '</footer>' tag by adding its length to end_position
    end_position += len(end_string)

    # Extract the content between the start and end positions
    modified_content = file_content[start_position:end_position]

    # Write the modified content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(modified_content)

    print(f"Successfully modified the file, keeping only content between '{start_string}' and '{end_string}'.")
else:
    if start_position == -1:
        print(f"The string '{start_string}' was not found in the file.")
    if end_position == -1:
        print(f"The string '{end_string}' was not found in the file.")

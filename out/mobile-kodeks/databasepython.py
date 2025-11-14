import os
from bs4 import BeautifulSoup

# Function to rearrange <html> tags in an HTML file
def rearrange_html_tags(file_path):
    with open(file_path, 'r') as file:
        # Parse the HTML content
        soup = BeautifulSoup(file, 'html.parser')

        # Extract all <html> tags and sort them by their attributes
        html_tags = soup.find_all('html')
        html_tags.sort(key=lambda tag: str(tag.attrs))

        # Remove existing <html> tags from the document
        for html_tag in html_tags:
            html_tag.extract()

        # Create a new <head> tag and append it to the first <html> tag
        new_head = soup.new_tag('head')
        first_html = html_tags[0]
        first_html.insert(0, new_head)

        # Append sorted <html> tags back to the document
        for html_tag in html_tags:
            soup.append(html_tag)

        # Write the modified HTML content back to the file
        with open(file_path, 'w') as output_file:
            output_file.write(str(soup))

# Get a list of all .html files in the current directory
html_files = [f for f in os.listdir() if f.endswith('.html')]

# Process each HTML file
for file_name in html_files:
    file_path = os.path.join(os.getcwd(), file_name)
    rearrange_html_tags(file_path)
    print(f'Rearranged HTML tags in {file_name}')

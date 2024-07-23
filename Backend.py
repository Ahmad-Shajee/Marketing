from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Function to connect to the database
def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',  # Change this if your MySQL server is hosted elsewhere
            user='root',  # Your MySQL username
            password='shajee',  # Your MySQL password
            database='marketing'  # The database name
        )
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

# Route to fetch all data from the campaign_info table
@app.route('/campaigns', methods=['GET'])
def get_campaigns():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM campaign_info"
    cursor.execute(query)
    campaigns = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(campaigns)

@app.route('/add-advertisement', methods=['POST'])
def add_advertisement():
    data = request.json
    connection = create_connection()
    
    if connection:
        cursor = connection.cursor()
        try:
            # Prepare the SQL query
            query = """
            INSERT INTO campaign_info (
                add_name, start_date_time, end_date_time, repeat_frequency, delivery,
                created_at, updated_at, impressions, closed, interaction,
                primary_button_text, primary_button_click, secondary_button_text, secondary_button_click, reach
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            # Prepare data for insertion
            values = (
                data.get('add_name'),
                data.get('starting_date_time'),
                data.get('ending_date_time'),
                data.get('repeat_frequency'),
                data.get('delivery'),
                datetime.now(),  # created_at
                datetime.now(),  # updated_at
                0,               # impressions
                0,               # closed
                0,               # interaction
                data.get('primary_button_text'),
                data.get('primary_button_click'),
                data.get('secondary_button_text'),
                data.get('secondary_button_click'),
                0                # reach
            )
            
            # Execute the query
            cursor.execute(query, values)
            connection.commit()
            
            response = {'message': 'Advertisement added successfully!'}
        except Error as e:
            response = {'message': 'Error adding advertisement.', 'error': str(e)}
            print(f"Error: '{e}'")
        finally:
            cursor.close()
            connection.close()
    else:
        response = {'message': 'Failed to connect to the database.'}
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

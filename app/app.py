from flask import Flask
from controller import controller

app = Flask(__name__)

# Rutas para Owner
app.add_url_rule('/owners', 'getOwners', controller.getOwners, methods=['GET'])
app.add_url_rule('/owners/<int:ownerId>', 'getOwner', controller.getOwner, methods=['GET'])
app.add_url_rule('/owners', 'createOwner', controller.createOwner, methods=['POST'])
app.add_url_rule('/owners/<int:ownerId>', 'updateOwner', controller.updateOwner, methods=['PUT'])
app.add_url_rule('/owners/<int:ownerId>', 'deleteOwner', controller.deleteOwner, methods=['DELETE'])

# Rutas para Property
app.add_url_rule('/properties', 'getProperties', controller.getProperties, methods=['GET'])
app.add_url_rule('/properties/<int:propertyId>', 'getProperty', controller.getProperty, methods=['GET'])
app.add_url_rule('/properties', 'createProperty', controller.createProperty, methods=['POST'])
app.add_url_rule('/properties/<int:propertyId>', 'updateProperty', controller.updateProperty, methods=['PUT'])
app.add_url_rule('/properties/<int:propertyId>', 'deleteProperty', controller.deleteProperty, methods=['DELETE'])

# Rutas para PropertyType
app.add_url_rule('/propertyTypes', 'getPropertyTypes', controller.getPropertyTypes, methods=['GET'])
app.add_url_rule('/propertyTypes/<int:propertyTypeId>', 'getPropertyType', controller.getPropertyType, methods=['GET'])
app.add_url_rule('/propertyTypes', 'createPropertyType', controller.createPropertyType, methods=['POST'])
app.add_url_rule('/propertyTypes/<int:propertyTypeId>', 'updatePropertyType', controller.updatePropertyType, methods=['PUT'])
app.add_url_rule('/propertyTypes/<int:propertyTypeId>', 'deletePropertyType', controller.deletePropertyType, methods=['DELETE'])

if __name__ == '__main__':
    app.run(debug=True)

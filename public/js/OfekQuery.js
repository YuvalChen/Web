var OfekQuery = function (obj) {
    this.obj = obj;
};

function $(element) {

    if (element == undefined || element == null || element == "") {
        return;
    }
    var result = [document];
    var listOfElements = element.split(' ');
    for (currElement of listOfElements) {

        var token = currElement.charAt(0);
        var name = currElement.substring(1);
        var newResult = [];

        if (token == "#") {
            newResult = [document.getElementById(name)];
        }
        else {
            for (currObject of result) {
                var collection;

                if (token == ".") {
                    collection = currObject.getElementsByClassName(name);
                }
                else {
                    collection = currObject.getElementsByTagName(currElement);
                }
                newResult = AddCollection(newResult, collection);
            }
        }
        result = newResult;
    }
    return new OfekQuery(result);

    function AddCollection(collection, classes) {
        for (currClass of classes) {
            collection.push(currClass);
        }
        return collection;
    }
}



OfekQuery.prototype.addClass = function (classToAdd) {
    for (object of this.obj)
        object.classList.add(classToAdd);
};

OfekQuery.prototype.removeClass = function (classToAdd) {
    for (object of this.obj)
        object.classList.remove(classToAdd);
};

OfekQuery.prototype.each = function (func) {
    for (object of this.obj)
        func(object);
};

OfekQuery.prototype.map = function (func) {
    var listOfResult = [];
    for (object of this.obj)
        listOfResult.push(func(object))
    return listOfResult;
};

OfekQuery.prototype.any = function () {
    for (object of this.obj) {
        if (CheackObject(object, arguments)) {
            return true;
        }
    }
    return false;
};

OfekQuery.prototype.all = function () {
    for (object of this.obj) {
        if (!CheackObject(object, arguments)) {
            return false;
        }
    }
    return true;
};

function CheackObject(object, funList) {
    for (index = 0; index < funList.length; index++) {
        if (!arguments[index](object)) {
            return false;
        }
    }
    return true;
};

OfekQuery.prototype.filter = function () {
    var passObjectList = [];
    for (object of this.obj) {
        if (CheackObject(object, arguments)) {
            passObjectList.push(object);
        }
    }
    return new OfekQuery(passObjectList);
};

OfekQuery.prototype.css = function (property, value) {
    this.each(function (obj) {
        obj.style[property] = value;
    });
};

OfekQuery.prototype.count = function () {
    return this.obj.length;
};

OfekQuery.prototype.appendChild = function (childElement) {
    this.each(function (obj) {
        obj.appendChild(childElement.cloneNode(true));
    });
};

OfekQuery.prototype.getAttribute = function (attributeName) {
    return this.map(function (obj) {
        return obj.getAttribute(attributeName);
    });
};

OfekQuery.prototype.value = function () {

    if (arguments.length > 0) {
        val = arguments[0];
        this.each(function (obj) {
            obj.value = val;
        })
    }
    else {
        results = this.map(function (obj) {
            return obj.value;
        });

        if (results.length == 1) {
            results = results[0];
        }

        return results;
    }
};

OfekQuery.prototype.setAttribute = function (attributeName, attributeValue) {
    this.each(function (obj) {
        return set.getAttribute(attributeName, attributeValue);
    });
};

OfekQuery.prototype.get = function (index) {
    return this.obj[index];
};

OfekQuery.prototype.printText = function (message) {
    this.each(function (obj) {
        obj.innerHTML = message;
    });
};
OfekQuery.prototype.getText = function () {
    return this.map(function (obj) {
        return obj.innerHTML;
    });
};


describe('Query selector', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['testOfekQuery.html'];
    });

    it('Not exist tag', function () {
        var element = $('#myDivNotExist');
        expect(element).toBe(null);
    });

    it('Returning object by id', function () {
        var element = $('#myDiv');
        var exceptedObject = document.getElementById("myDiv");
        expect(element.obj[0]).toBe(exceptedObject);
    });

    it('Returning array of objects by class', function () {
        var element = $('.public-class');
        var exceptedObjects = document.getElementsByClassName("public-class");
        expect(element.obj.count).toBe(exceptedObjects.count);
    });

    it('Returning array of objects by tags', function () {
        var element = $('div');
        var exceptedObjects = document.getElementsByTagName("div");
        expect(element.obj.count).toBe(exceptedObjects.count);
    });
});

describe('Add', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['testOfekQuery.html'];
    });
    it('Adding class to element with no classes', function () {
        var element = $('#emptyClassesdiv').addClass("test-class");
        var exceptedObjects = document.getElementById("emptyClassesdiv");
        expect(exceptedObjects.getAttribute("class")).toBe("test-class");
    });

    it('Adding class to element with few classes', function () {
        var element = $('#classesDiv');
        var exceptedObjects = document.getElementById("classesDiv");
        element.addClass("test-class");
        expect(exceptedObjects.getAttribute("class")).toBe("exist-class test-class");
    });
});

describe('Remove', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['testOfekQuery.html'];
    });
    it('Removing class to element with no classes', function () {
        var element = $('#emptyClassesdivRemove').removeClass("test-class");
        var exceptedObjects = document.getElementById("emptyClassesdivRemove");
        expect(exceptedObjects.getAttribute("class")).toBe("");
    });

    it('Removing class to element with few classes', function () {
        var element = $('#classesDivRemove').removeClass("test-class");
        var exceptedObjects = document.getElementById("classesDivRemove");
        expect(exceptedObjects.getAttribute("class")).toBe("exist-class");
    });
});

describe('Get', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['testOfekQuery.html'];
    });
    it('get element according to id with 2 elements', function () {
        var element = $('.parent-id .child-id');
        expect(element.get(0)).toBe(document.getElementById("firstTest"));
        expect(element.get(1)).toBe(document.getElementById("secondTest"));
    });

    it('get null where no element with 1 elements', function () {
        var element = $('#child-test');
        expect(element.get(0)).toBe(document.getElementById("child-test"));
    });
});

describe('Any', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['testOfekQuery.html'];
    });
    it('if one function is true', function () {
        var result = $('.toAnyOneValid').any(function (obj) {
            return obj.innerHTML != "";
        });
        expect(result).toBe(true);
    });

    it('if all the functions are false', function () {
        var result = $('.toAnyNoValid').any(function (obj) {
            return obj.innerHTML != "";
        });
        expect(result).toBe(false);
    });

    it('if all the functions are true', function () {
        var result = $('.twoFunctionSuccess').any(function (obj) {
            return obj.innerHTML != "";
        }, function (obj) {
            return parseInt(obj.innerHTML) > 5;
        });
        expect(result).toBe(true);
    });

    it('if all the functions are true', function () {
        var result = $('.oneFunctionSuccess').any(function (obj) {
            return obj.innerHTML != "";
        }, function (obj) {
            return parseInt(obj.innerHTML) > 5;
        });
        expect(result).toBe(false);
    });
});

describe('All', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['testOfekQuery.html'];
    });
    it('if all functions is true', function () {
        var result = $('.allTestTrue').all(function (obj) {
            return parseInt(obj.innerHTML) > 5;
        });
        expect(result).toBe(true);
    });

    it('if few functions are false', function () {
        var result = $('.fewTestTrue').all(function (obj) {
            return parseInt(obj.innerHTML) > 5;
        });
        expect(result).toBe(false);
    });

    it('if all the functions are true', function () {
        var result = $('.allTestTrue').all(function (obj) {
            return obj.innerHTML != "";
        }, function (obj) {
            return parseInt(obj.innerHTML) > 5;
        });
        expect(result).toBe(true);
    });

    it('if all the functions are true', function () {
        var result = $('.fewTestTrue').all(function (obj) {
            return obj.innerHTML != "";
        }, function (obj) {
            return parseInt(obj.innerHTML) > 5;
        });
        expect(result).toBe(false);
    });
});

describe('Css', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['testOfekQuery.html'];
    });
    it('if all functions is true', function () {
        var element = $("#css-div");
        element.css("color", "green");
        var currDiv = document.getElementById("css-div");
        expect(currDiv.style["color"]).toBe("green");
    });

    it('if all functions is true', function () {
        var element = $("#css-div-second");
        element.css("color", "green");
        var currDiv = document.getElementById("css-div-second");
        expect(currDiv.style["color"]).toBe("green");
    });
});
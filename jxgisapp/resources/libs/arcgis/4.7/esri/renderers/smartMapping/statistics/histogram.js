// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports dojo/_base/lang ../../../core/promiseUtils ../../../layers/support/fieldUtils ./support/utils ../support/utils".split(" "),function(q,r,m,c,k,d,g){function n(b){if(!(b&&b.layer&&(b.field||b.valueExpression||b.sqlExpression)))return c.reject(d.createError("histogram:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));if(b.valueExpression&&!b.sqlExpression&&!b.view)return c.reject(d.createError("histogram:missing-parameters",
"View is required when 'valueExpression' is specified"));var a=m.mixin({},b);a.normalizationType=g.getNormalizationType(a);b=[0,1,2,3];var f=g.createLayerAdapter(a.layer,b);return(a.layer=f)?f.load().then(function(){var b=a.valueExpression||a.sqlExpression,e=a.field,h=e?f.getField(e):null,l=!a.classificationMethod||"equal-interval"===a.classificationMethod,e=g.getFieldsList({field:e,normalizationField:a.normalizationField,valueExpression:a.valueExpression});if(e=d.verifyBasicFieldValidity(f,e,"histogram:invalid-parameters"))return c.reject(e);
if(h){if(b=d.verifyFieldType(f,h,"histogram:invalid-parameters",p))return c.reject(b);if(k.isDateField(h)){if(a.normalizationType)return c.reject(d.createError("histogram:invalid-parameters","Normalization is not allowed for date fields"));if(!l)return c.reject(d.createError("histogram:invalid-parameters","'classificationMethod' other than 'equal-interval' is not allowed for date fields"))}}else if(b){if(a.normalizationType)return c.reject(d.createError("histogram:invalid-parameters","Normalization is not allowed when 'valueExpression' or 'sqlExpression' is specified"));
if(!l)return c.reject(d.createError("histogram:invalid-parameters","'classificationMethod' other than 'equal-interval' is not allowed when 'valueExpression' or 'sqlExpression' is specified"))}return a}):c.reject(d.createError("histogram:invalid-parameters","'layer' must be one of these types: "+g.getLayerTypeLabels(b).join(", ")))}var p=["date"].concat(k.numericTypes);return function(b){return n(b).then(function(a){return a.layer.histogram({field:a.field,valueExpression:a.valueExpression,sqlExpression:a.sqlExpression,
sqlWhere:a.sqlWhere,normalizationType:a.normalizationType,normalizationField:a.normalizationField,classificationMethod:a.classificationMethod,standardDeviationInterval:a.standardDeviationInterval,numBins:a.numBins,minValue:a.minValue,maxValue:a.maxValue,features:a.features,view:a.view})})}});
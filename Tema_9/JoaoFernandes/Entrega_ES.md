Parte I) Generar un alias
curl --location 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/_aliases' \
--header 'Content-Type: application/json' \
--data '{
    "actions": [
        {
            "add": {
                "index": "employees",
                "alias": "employees-alias"
            }
        }
    ]
}'

Parte II) Inserción de elementos

curl --location 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_doc' \
--header 'Content-Type: application/json' \
--data '{
   "FirstName":"RICARDO",
   "LastName":"ALONSO",
   "Designation":"Software Architect",
   "Salary":"1000000",
   "DateOfJoining":"2014-01-13",
   "Address":"8445 Green Street Morristown, NJ 07960",
   "Gender":"Male",
   "Age":35,
   "MaritalStatus":"Married",
   "Interests":"R/C Boats,Dolls,Cloud Watching,Animals/pets/dogs,Crocheting,Casino Gambling"
}'

Parte III) Obtención simple de elementos

curl --location 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_doc/hhw7YZwBOXjEs_IYatsP'

Parte IV) Eliminación de elementos

curl --location --request DELETE 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees/_doc/hhw7YZwBOXjEs_IYatsP'

Parte V) Consultas

Obtener empleados cuyo puesto sea Software Engineer. 
curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "term": {
            "Designation": "Software Engineer"
        }
    }
}'

Obtener empleados cuyo puesto NO sea Software Engineer. 

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
 "query": {
      "bool": {
        "must_not": [
          {
            "term": {
              "Designation": "Software Engineer"
            }
          }
        ]
      }
    }
}'

Obtener la primera página de empleados cuya designation sea Software Engineer asumiendo un tamaño de página de 35 elementos. 

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "from": 0,
    "size": 35,
     "query": {
        "term": {
            "Designation": "Software Engineer"
        }
    }
}'

Obtener la tercera página de empleados cuya designation sea Software Engineer asumiendo un tamaño de página de 35 elementos.

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "from": 70,
    "size": 35,
     "query": {
        "term": {
            "Designation": "Software Engineer"
        }
    }
}'

Obtener los primeros 13 empleados cuyo salario sea mayor a 67.000 dólares. 

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees/_search' \
--header 'Content-Type: application/json' \
--data '{
"size": 13,
    "query": {
      "range": {
        "Salary": {
          "gt": 67000
        }
      }
    }
}'

Obtener el número total que hayan entrado en la empresa en el mes de Mayo del año 2003. No se pide una consulta específica, solo saber el número total de hits.

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees/_search' \
--header 'Content-Type: application/json' \
--data '{
  "size": 0,
    "query": {
      "range": {
        "DateOfJoining": {
          "gte": "2003-05-01",
          "lt": "2003-06-01"
        }
      }
    }
}'

Obtener empleados cuyo nombre sea NATALIE. 

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
      "match": {
        "FirstName": "NATALIE"
      }
    }
}'

Obtener empleados cuya dirección sea o contenga Street. 

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
 "query": {
      "match": {
        "Address": "Street"
      }
    }
}'

Obtener empleados cuya dirección sea o contenga wood.

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
 "query": {
      "match": {
        "Address": "wood"
      }
    }
}'

Obtener empleados interesados en Wrestling.

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
"query": {
      "match": {
        "Interests": "Wrestling"
      }
    }
}'

Obtener el número de hombres y mujeres interesad@s en Wrestling.

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
 "size": 0,
    "query": {
      "match": {
        "Interests": "Wrestling"
      }
    },
    "aggs": {
      "por_genero": {
        "terms": {
          "field": "Gender"
        }
      }
    }
}'

En base a la consulta anterior, obtener la edad media de cada grupo (grupo hombres y grupo mujeres). 

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
   "size": 0,
    "query": {
      "match": {
        "Interests": "Wrestling"
      }
    },
    "aggs": {
      "por_genero": {
        "terms": {
          "field": "Gender"
        },
        "aggs": {
          "edad_media": {
            "avg": {
              "field": "Age"
            }
          }
        }
      }
    }
}'

Obtener el número de empleados en función de los siguientes tramos de salario: menor de 60.000 dólares (tramo 1), entre 60.000 dólares y 67.000 dólares (tramo 2) y superior a 67.000 dólares (tramo 3). 

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "size": 0,
    "aggs": {
      "tramos_salario": {
        "range": {
          "field": "Salary",
          "ranges": [
            { "to": 60000 },
            { "from": 60000, "to": 67000 },
            { "from": 67000 }
          ]
        }
      }
    }
}'

En base a la consulta anterior, para cada tramo, hallar el número de empleados que están casados y no casados.

curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
   "size": 0,
    "aggs": {
      "tramos_salario": {
        "range": {
          "field": "Salary",
          "ranges": [
            { "to": 60000 },
            { "from": 60000, "to": 67000 },
            { "from": 67000 }
          ]
        },
        "aggs": {
          "por_estado_civil": {
            "terms": {
              "field": "MaritalStatus"
            }
          }
        }
      }
    }
}'

Parte VI) Crear otro índice y modificar el alias

Crea un nuevo índice de la misma forma que hiciste al principio, pero ahora llámalo employees-v2 y mete en él todos los datos del fichero de prueba. Modifica el alias employees-alias que creaste antes para que apunte tanto al índice employees original como al nuevo employees-v2. Puedes comprobar que lo has hecho correctamente ejecutando la operación "Obtener todos los alias" de la colección de Postman.

curl --location 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/_alias'
Se verifica que los dos indices tienen el mismo alias
{
    "employees-v2": {
        "aliases": {
            "employees-alias": {}
        }
    },
    "employees": {
        "aliases": {
            "employees-alias": {}
        }
    }
}

Realiza alguna de las consultas anteriores. ¿Qué observas?

Al ejecutar una de las consultas anteriores sobre el alias employees-alias, se observa que la búsqueda se realiza sobre ambos índices (employees y employees-v2).


curl --location --request GET 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
      "match": {
        "FirstName": "NATALIE"
      }
    }
}'

{
    "took": 460,
    "timed_out": false,
    "_shards": {
        "total": 2,
        "successful": 2,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 8.804874,
        "hits": [
            {
                "_index": "employees",
                "_id": "JhwVYZwBOXjEs_IYl7mD",
                "_score": 8.804874,
                "_source": {
                    "FirstName": "NATALIE",
                    "LastName": "SERVIS",
                    "Designation": "Senior Software Engineer",
                    "Salary": "61000",
                    "DateOfJoining": "2003-09-19",
                    "Address": "34 Kingston St. El Dorado, AR 71730",
                    "Gender": "Female",
                    "Age": 35,
                    "MaritalStatus": "Unmarried",
                    "Interests": "Guitar,Learning A Foreign Language,Blacksmithing,Embroidery,Collecting,Becoming A Child Advocate,Taxidermy"
                }
            },
            {
                "_index": "employees-v2",
                "_id": "OByNYZwBOXjEs_IYjOA_",
                "_score": 8.804874,
                "_source": {
                    "FirstName": "NATALIE",
                    "LastName": "SERVIS",
                    "Designation": "Senior Software Engineer",
                    "Salary": "61000",
                    "DateOfJoining": "2003-09-19",
                    "Address": "34 Kingston St. El Dorado, AR 71730",
                    "Gender": "Female",
                    "Age": 35,
                    "MaritalStatus": "Unmarried",
                    "Interests": "Guitar,Learning A Foreign Language,Blacksmithing,Embroidery,Collecting,Becoming A Child Advocate,Taxidermy"
                }
            }
        ]
    }
}

Elimina employees del conjunto de índices a los que hace referencia el alias.

curl --location 'https://6138337e76:e1a4bdf0a1613f97e129@brilliant-hazel-1me3cnwm.eu-west-1.bonsaisearch.net/_aliases' \
--header 'Content-Type: application/json' \
--data '{
    "actions": [
        {
            "remove": {
                "index": "employees",
                "alias": "employees-alias"
            }
        }
    ]
}'
//------------------------------------------------------------ACOUNT------------------------------------------------------------
/**
 * @swagger
 * /Account:
 *  get:
 *    tags: 
 *      - Account
 *    description: Get all Users
 *    responses:
 *      '200':
 *        description: Success !
 */
/**
/**
* @swagger
*  /Account/Login:
*    post:
*      consumes:
*        - application/json
*      tags:
*        - Account
*      parameters:
*        - in: body
*          name: user
*          description: The user to create.
*          schema:
*            type: object
*            properties:
*              UserName:
*                type: string
*              Password:
*                type: string
*      responses:
*        '200':
*          description: Success !
*/
/**
* @swagger
*  /Account/Register:
*    post:
*      consumes:
*        - application/json
*      tags:
*        - Account
*      parameters:
*        - in: body
*          name: user
*          description: The user to create.
*          schema:
*            type: object
*            properties:
*              UserName:
*                type: string
*              Password:
*                type: string
*              FullName:
*                type: string
*              Email:
*                type: string
*              Role:
*                type: array
*      responses:
*        '200':
*          description: Success !
*/
/**
* @swagger
*  /Account/{id}:
*    put:
*      consumes:
*        - application/json
*      tags:
*        - Account
*      parameters:
*        - in: path
*          name: id
*        - in: body
*          name: user
*          description: The user to create.
*          schema:
*            type: object
*            properties:
*              UserName:
*                type: string
*              Password:
*                type: string
*              FullName:
*                type: string
*              Email:
*                type: string
*              Role:
*                type: array
*      responses:
*        '200':
*          description: Success !
*/
/**
* @swagger
*  /Account/{id}:
*    delete:
*      consumes:
*        - application/json
*      tags:
*        - Account
*      parameters:
*        - in: path
*          name: id
*      responses:
*        '200':
*          description: Success !
*/
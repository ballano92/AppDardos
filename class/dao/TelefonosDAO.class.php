<?php
/**
 * Intreface DAO
 *
 * @author: http://phpdao.com
 * @date: 2017-02-11 11:07
 */
interface TelefonosDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @Return Telefonos 
	 */
	public function load($id);

	/**
	 * Get all records from table
	 */
	public function queryAll();
	
	/**
	 * Get all records from table ordered by field
	 * @Param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn);
	
	/**
 	 * Delete record from table
 	 * @param telefono primary key
 	 */
	public function delete($id_telefono);
	
	/**
 	 * Insert record to table
 	 *
 	 * @param Telefonos telefono
 	 */
	public function insert($telefono);
	
	/**
 	 * Update record in table
 	 *
 	 * @param Telefonos telefono
 	 */
	public function update($telefono);	

	/**
	 * Delete all rows
	 */
	public function clean();

	public function queryByIdCliente($value);

	public function queryByTipo($value);

	public function queryByTelefono($value);


	public function deleteByIdCliente($value);

	public function deleteByTipo($value);

	public function deleteByTelefono($value);


}
?>
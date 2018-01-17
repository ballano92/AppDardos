<?php
/**
 * Class that operate on table 'telefonos'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2017-02-11 11:07
 */
class TelefonosMySqlDAO implements TelefonosDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @return TelefonosMySql 
	 */
	public function load($id){
		$sql = 'SELECT * FROM telefonos WHERE id_telefono = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($id);
		return $this->getRow($sqlQuery);
	}
	public function loadcli($id){
		$sql = 'SELECT * FROM telefonos WHERE id_cliente = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($id);
		return $this->getList($sqlQuery);
	}

	/**
	 * Get all records from table
	 */
	public function queryAll(){
		$sql = 'SELECT * FROM telefonos';
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
	 * Get all records from table ordered by field
	 *
	 * @param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn){
		$sql = 'SELECT * FROM telefonos ORDER BY '.$orderColumn;
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
 	 * Delete record from table
 	 * @param telefono primary key
 	 */
	public function delete($id_telefono){
		$sql = 'DELETE FROM telefonos WHERE id_telefono = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($id_telefono);
		return $this->executeUpdate($sqlQuery);
	}
	public function deletecli($id_cli){
		$sql = 'DELETE FROM telefonos WHERE id_cliente = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($id_cli);
		return $this->executeUpdate($sqlQuery);
	}
	
	/**
 	 * Insert record to table
 	 *
 	 * @param TelefonosMySql telefono
 	 */
	public function insert($telefono){
		$sql = 'INSERT INTO telefonos (id_cliente, tipo, telefono) VALUES (?, ?, ?)';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->setNumber($telefono->idCliente);
		$sqlQuery->set($telefono->tipo);
		$sqlQuery->setNumber($telefono->telefono);

		$id = $this->executeInsert($sqlQuery);	
		$telefono->idTelefono = $id;
		return $id;
	}
	
	/**
 	 * Update record in table
 	 *
 	 * @param TelefonosMySql telefono
 	 */
	public function update($telefono){
		$sql = 'UPDATE telefonos SET id_cliente = ?, tipo = ?, telefono = ? WHERE id_telefono = ?';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->setNumber($telefono->idCliente);
		$sqlQuery->set($telefono->tipo);
		$sqlQuery->setNumber($telefono->telefono);

		$sqlQuery->setNumber($telefono->idTelefono);
		return $this->executeUpdate($sqlQuery);
	}

	/**
 	 * Delete all rows
 	 */
	public function clean(){
		$sql = 'DELETE FROM telefonos';
		$sqlQuery = new SqlQuery($sql);
		return $this->executeUpdate($sqlQuery);
	}

	public function queryByIdCliente($value){
		$sql = 'SELECT * FROM telefonos WHERE id_cliente = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($value);
		return $this->getList($sqlQuery);
	}

	public function queryByTipo($value){
		$sql = 'SELECT * FROM telefonos WHERE tipo = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByTelefono($value){
		$sql = 'SELECT * FROM telefonos WHERE telefono = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($value);
		return $this->getList($sqlQuery);
	}


	public function deleteByIdCliente($value){
		$sql = 'DELETE FROM telefonos WHERE id_cliente = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByTipo($value){
		$sql = 'DELETE FROM telefonos WHERE tipo = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByTelefono($value){
		$sql = 'DELETE FROM telefonos WHERE telefono = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($value);
		return $this->executeUpdate($sqlQuery);
	}


	
	/**
	 * Read row
	 *
	 * @return TelefonosMySql 
	 */
	protected function readRow($row){
		$telefono = new Telefono();
		
		$telefono->idTelefono = $row['id_telefono'];
		$telefono->idCliente = $row['id_cliente'];
		$telefono->tipo = $row['tipo'];
		$telefono->telefono = $row['telefono'];

		return $telefono;
	}
	
	protected function getList($sqlQuery){
		$tab = QueryExecutor::execute($sqlQuery);
		$ret = array();
		for($i=0;$i<count($tab);$i++){
			$ret[$i] = $this->readRow($tab[$i]);
		}
		return $ret;
	}
	
	/**
	 * Get row
	 *
	 * @return TelefonosMySql 
	 */
	protected function getRow($sqlQuery){
		$tab = QueryExecutor::execute($sqlQuery);
		if(count($tab)==0){
			return null;
		}
		return $this->readRow($tab[0]);		
	}
	
	/**
	 * Execute sql query
	 */
	protected function execute($sqlQuery){
		return QueryExecutor::execute($sqlQuery);
	}
	
		
	/**
	 * Execute sql query
	 */
	protected function executeUpdate($sqlQuery){
		return QueryExecutor::executeUpdate($sqlQuery);
	}

	/**
	 * Query for one row and one column
	 */
	protected function querySingleResult($sqlQuery){
		return QueryExecutor::queryForString($sqlQuery);
	}

	/**
	 * Insert row to table
	 */
	protected function executeInsert($sqlQuery){
		return QueryExecutor::executeInsert($sqlQuery);
	}
}
?>
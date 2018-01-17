<?php

/**
 * DAOFactory
 * @author: http://phpdao.com
 * @date: ${date}
 */
class DAOFactory{
	
	/**
	 * @return ClienteDAO
	 */
	public static function getClienteDAO(){
		return new ClienteMySqlExtDAO();
	}

	/**
	 * @return TelefonosDAO
	 */
	public static function getTelefonosDAO(){
		return new TelefonosMySqlExtDAO();
	}


}
?>
package models

import play.api.db.slick.Config.driver.simple._


case class Motherboard(id: Int, manufacturer: String, model: String, socket: String, imgUrl: String, price: Float, popularity: Int)

class MotherboardTable(tag: Tag) extends Table[Motherboard](tag, "MOTHERBOARD") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def model = column[String]("MODEL", O.NotNull)
  def socket = column[String]("SOCKET", O.NotNull)
  def imageUrl = column[String]("IMG_URL", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)

  def popularity = column[Int]("POPULARITY", O.NotNull)

  def * = (id, manufacturer, model, socket, imageUrl, price, popularity) <> (Motherboard.tupled, Motherboard.unapply)
}

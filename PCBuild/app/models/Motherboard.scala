package models

import play.api.db.slick.Config.driver.simple._
import play.api.libs.json.Json


case class Motherboard(id: Int, manufacturer: String, model: String, socket: String, memoryType: String, imageUrl: String, price: Float, popularity: Int)

class MotherboardTable(tag: Tag) extends Table[Motherboard](tag, "MOTHERBOARD") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def model = column[String]("MODEL", O.NotNull)
  def socket = column[String]("SOCKET", O.NotNull)
  def memoryType = column[String]("MEMORY_TYPE", O.NotNull)
  def imageUrl = column[String]("IMAGE_URL", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)

  def popularity = column[Int]("POPULARITY", O.NotNull)

  def * = (id, manufacturer, model, socket, memoryType, imageUrl, price, popularity) <> (Motherboard.tupled, Motherboard.unapply)
}

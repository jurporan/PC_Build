package models

import play.api.db.slick.Config.driver.simple._


case class Alimentation(id: Int, manufacturer: String, model: String, power: Float, imageUrl: String, price: Float, popularity: Int)

class AlimentationTable(tag: Tag) extends Table[Alimentation](tag, "ALIMENTATION") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def model = column[String]("MODEL", O.NotNull)
  def power = column[Float]("POWER", O.NotNull)
  def imageUrl = column[String]("IMAGE_URL", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)

  def popularity = column[Int]("POPULARITY", O.NotNull)

  def * = (id, manufacturer, model, power, imageUrl, price, popularity) <> (Alimentation.tupled, Alimentation.unapply)
}

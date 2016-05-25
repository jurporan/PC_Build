package models

import play.api.db.slick.Config.driver.simple._


case class Motherboard(id: Int, manufacturer: String, model: String)

class MotherboardTable(tag: Tag) extends Table[Motherboard](tag, "MOTHERBOARD") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def model = column[String]("MODEL", O.NotNull)

  def popularity = column[Int]("POPULARITY", O.NotNull)

  def * = (id, manufacturer, model) <> (Motherboard.tupled, Motherboard.unapply)
}

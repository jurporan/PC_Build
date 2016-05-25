package models

import play.api.db.slick.Config.driver.simple._

case class Case(id: Int, model: String, manufacturer: String, width: Float, height: Float, length: Float,  popularity: Int, price: Float, imageURL: String)

/* Table mapping
 */
class CaseTable(tag: Tag) extends Table[Case](tag, "CASE")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("NAME", O.NotNull)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def width = column[Float]("WIDTH", O.NotNull)
  def height = column[Float]("HEIGHT", O.NotNull)
  def length = column[Float]("LENGTHT", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)
  def imageURL = column[String]("IMAGE_URL")

  def * = (id, model, manufacturer, width, height, length, popularity, price) <> (Case.tupled, Case.unapply)
}

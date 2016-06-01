package models

import play.api.db.slick.Config.driver.simple._

case class ComputerCase(id: Int, model: String, manufacturer: String, width: Float, height: Float, length: Float,  gc_max_length: Float, popularity: Int, price: Float, imageURL: String)

/* Table mapping
 */
class ComputerCaseTable(tag: Tag) extends Table[ComputerCase](tag, "COMPUTER_CASE")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("MODEL", O.NotNull)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def width = column[Float]("WIDTH", O.NotNull)
  def height = column[Float]("HEIGHT", O.NotNull)
  def length = column[Float]("LENGTH", O.NotNull)
  def gc_max_length = column[Float]("GC_MAX_LENGTH", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)
  def imageURL = column[String]("IMAGE_URL")

  def * = (id, model, manufacturer, width, height, length, gc_max_length, popularity, price, imageURL) <> (ComputerCase.tupled, ComputerCase.unapply)
}

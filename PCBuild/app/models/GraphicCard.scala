package models

import play.api.db.slick.Config.driver.simple._

case class GraphicCard(id: Int, model: String, manufacturer: String, memory: Float, frequency: Float, width: Float, height: Float, length: Float, consumption:Float,  popularity: Int, price: Float, imageURL: String)

/* Table mapping
 */
class GraphicCardTable(tag: Tag) extends Table[GraphicCard](tag, "GRAPHIC_CARD")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("MODEL", O.NotNull)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def memory = column[Float]("MEMORY", O.NotNull)
  def frequency = column[Float]("FREQUENCY", O.NotNull)
  def width = column[Float]("WIDTH", O.NotNull)
  def height = column[Float]("HEIGHT", O.NotNull)
  def length = column[Float]("LENGTH", O.NotNull)
  def consumption = column[Float]("CONSUMPTION", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)
  def imageURL = column[String]("IMAGE_URL")

  def * = (id, model, manufacturer, memory, frequency, width, height, length, consumption, popularity, price, imageURL) <> (GraphicCard.tupled, GraphicCard.unapply)
}

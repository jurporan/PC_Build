package models

import play.api.db.slick.Config.driver.simple._

case class GraphicCard(id: Int, model: String, manufacturer: String, memory: Float, consumption:Float,  popularity: Int)

/* Table mapping
 */
class GraphicCardTable(tag: Tag) extends Table[GraphicCard](tag, "GRAPHIC_CARD")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("NAME", O.NotNUll)
  def manufacturer = column[String]("MANUFACTURER", O.NotNUll)
  def memory = column[Float]("MEMORY", O.NotNUll)
  def consumption = column[Float]("CONSUMPTION", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
}

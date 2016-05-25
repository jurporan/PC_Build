package models

import play.api.db.slick.Config.driver.simple._

case class Case(id: Int, model: String, manufacturer: String, width: Float, height: Float, depht: Float,  popularity: Int)

/* Table mapping
 */
class CaseTable(tag: Tag) extends Case[Memory](tag, "CASE")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("NAME", O.NotNUll)
  def manufacturer = column[String]("MANUFACTURER", O.NotNUll)
  def width = column[Float]("WIDTH", O.NotNUll)
  def height = column[Float]("HEIGHT", O.NotNUll)
  def depht = column[Float]("DEPHT", O.NotNUll)
  def popularity = column[Int]("POPULARITY", O.NotNull)
}

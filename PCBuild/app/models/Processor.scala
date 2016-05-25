package models

import play.api.db.slick.Config.driver.simple._

case class Processor(id: Int, model: String, manufacturer: String, nbCores: Int, nbThreads: Int, frequency: Float, consumption: Float, popularity: Int)

/* Table mapping
 */
class ProcessorTable(tag: Tag) extends Table[Processor](tag, "PROCESSOR")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("NAME", O.NotNUll)
  def manufacturer = column[String]("MANUFACTURER", O.NotNUll)
  def nbCores = column[Int]("NB_CORES", O.NotNUll)
  def nbThreads = column[Int]("NB_THREADS", O.NotNUll)
  def frequency = column[Float]("FREQUENCY", O.NotNUll)
  def consumption = column[Float]("CONSUMPTION", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
}
